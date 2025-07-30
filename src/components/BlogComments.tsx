import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Reply, Trash2, Edit, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string | null;
  parent_comment_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  profiles?: {
    full_name: string;
    role: string;
  };
  replies?: Comment[];
}

interface BlogCommentsProps {
  blogPostId: string;
}

const BlogComments = ({ blogPostId }: BlogCommentsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [blogPostId]);

  const fetchComments = async () => {
    try {
      // Fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', blogPostId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      if (!commentsData || commentsData.length === 0) {
        setComments([]);
        return;
      }

      // Get unique user IDs
      const userIds = [...new Set(commentsData.map(comment => comment.user_id))];

      // Fetch profiles for these users
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, role')
        .in('user_id', userIds);

      if (profilesError) throw profilesError;

      // Create a map of user_id to profile
      const profilesMap = new Map(
        (profilesData || []).map(profile => [profile.user_id, profile])
      );

      // Merge comments with profiles
      const commentsWithProfiles = commentsData.map(comment => ({
        ...comment,
        profiles: comment.user_id ? profilesMap.get(comment.user_id) : null
      }));

      // Organize comments into parent-child structure
      const organizedComments = organizeComments(commentsWithProfiles);
      setComments(organizedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const organizeComments = (flatComments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    // First pass: create comment objects with empty replies array
    flatComments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: organize into parent-child structure
    flatComments.forEach(comment => {
      const commentWithReplies = commentMap.get(comment.id)!;
      
      if (comment.parent_comment_id) {
        const parent = commentMap.get(comment.parent_comment_id);
        if (parent) {
          parent.replies!.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    return rootComments;
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    if (!user && (!guestName.trim() || !guestEmail.trim())) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email to comment",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const insertData: any = {
        blog_post_id: blogPostId,
        content: newComment.trim(),
        parent_comment_id: null
      };

      if (user) {
        insertData.user_id = user.id;
      } else {
        insertData.guest_name = guestName.trim();
        insertData.guest_email = guestEmail.trim();
      }

      const { error } = await supabase
        .from('blog_comments')
        .insert([insertData]);

      if (error) throw error;

      setNewComment('');
      if (!user) {
        setGuestName('');
        setGuestEmail('');
      }
      await fetchComments();
      toast({
        title: "Success",
        description: "Comment posted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post comment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return;
    if (!user && (!guestName.trim() || !guestEmail.trim())) {
      toast({
        title: "Missing Information", 
        description: "Please provide your name and email to reply",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const insertData: any = {
        blog_post_id: blogPostId,
        content: replyContent.trim(),
        parent_comment_id: parentId
      };

      if (user) {
        insertData.user_id = user.id;
      } else {
        insertData.guest_name = guestName.trim();
        insertData.guest_email = guestEmail.trim();
      }

      const { error } = await supabase
        .from('blog_comments')
        .insert([insertData]);

      if (error) throw error;

      setReplyContent('');
      setReplyTo(null);
      await fetchComments();
      toast({
        title: "Success",
        description: "Reply posted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post reply",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('blog_comments')
        .update({ content: editContent.trim() })
        .eq('id', commentId);

      if (error) throw error;

      setEditingComment(null);
      setEditContent('');
      await fetchComments();
      toast({
        title: "Success",
        description: "Comment updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update comment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      await fetchComments();
      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete comment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canEditOrDelete = (comment: Comment) => {
    if (!user) return false;
    return comment.user_id === user.id || user.user_metadata?.role === 'admin';
  };

  const getDisplayName = (comment: Comment) => {
    if (comment.profiles?.full_name) {
      return comment.profiles.full_name;
    }
    if (comment.guest_name) {
      return comment.guest_name;
    }
    return 'Anonymous User';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <Card className={`${isReply ? 'ml-8 mt-4' : 'mb-6'} animate-fade-in`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(getDisplayName(comment))}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{getDisplayName(comment)}</span>
                {comment.profiles?.role === 'admin' && (
                  <Badge variant="secondary" className="text-xs">Admin</Badge>
                )}
                {comment.guest_name && (
                  <Badge variant="outline" className="text-xs">
                    <User className="h-3 w-3 mr-1" />
                    Guest
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(comment.created_at)}
                {comment.updated_at !== comment.created_at && ' (edited)'}
              </span>
            </div>
          </div>
          
          {canEditOrDelete(comment) && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingComment(comment.id);
                  setEditContent(comment.content);
                }}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {editingComment === comment.id ? (
          <div className="space-y-3">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Edit your comment..."
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleEditComment(comment.id)}
                disabled={loading || !editContent.trim()}
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingComment(null);
                  setEditContent('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm whitespace-pre-wrap mb-3">{comment.content}</p>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="text-xs"
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}

            {replyTo === comment.id && (
              <div className="mt-4 space-y-3">
                {!user && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Your name *"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                    <Input
                      placeholder="Your email *"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                    />
                  </div>
                )}
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={loading || !replyContent.trim()}
                  >
                    Post Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyTo(null);
                      setReplyContent('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-6 pb-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-xl font-semibold">
          Comments ({comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)})
        </h3>
      </div>

      <Card className="bg-gradient-to-r from-card/50 to-card">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {!user && (
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Your name *"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
                <Input
                  placeholder="Your email *"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </div>
            )}
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={user ? "Share your thoughts about this post..." : "Share your thoughts about this post... (Name and email required)"}
              className="min-h-[100px]"
            />
            <Button
              onClick={handleSubmitComment}
              disabled={loading || !newComment.trim() || (!user && (!guestName.trim() || !guestEmail.trim()))}
              className="w-full sm:w-auto"
            >
              Post Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        {comments.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                No comments yet. Be the first to share your thoughts!
              </p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogComments;