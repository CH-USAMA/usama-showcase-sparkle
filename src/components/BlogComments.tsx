import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Reply, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  guest_name: string;
  guest_email: string;
  replies: Comment[];
}

interface BlogCommentsProps {
  blogPostId: string;
}

const BlogComments = ({ blogPostId }: BlogCommentsProps) => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim() || !guestName.trim() || !guestEmail.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your name, email, and comment",
        variant: "destructive",
      });
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment.trim(),
      created_at: new Date().toISOString(),
      guest_name: guestName.trim(),
      guest_email: guestEmail.trim(),
      replies: [],
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
    toast({ title: "Success", description: "Comment posted!" });
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim() || !guestName.trim() || !guestEmail.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your name, email, and reply",
        variant: "destructive",
      });
      return;
    }

    const reply: Comment = {
      id: Date.now().toString(),
      content: replyContent.trim(),
      created_at: new Date().toISOString(),
      guest_name: guestName.trim(),
      guest_email: guestEmail.trim(),
      replies: [],
    };

    setComments(prev =>
      prev.map(c =>
        c.id === parentId ? { ...c, replies: [...c.replies, reply] } : c
      )
    );
    setReplyContent('');
    setReplyTo(null);
    toast({ title: "Success", description: "Reply posted!" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <Card className={`${isReply ? 'ml-8 mt-4' : 'mb-6'} animate-fade-in`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(comment.guest_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{comment.guest_name}</span>
              <Badge variant="outline" className="text-xs">
                <User className="h-3 w-3 mr-1" />Guest
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm whitespace-pre-wrap mb-3">{comment.content}</p>
        {!isReply && (
          <Button variant="ghost" size="sm" onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)} className="text-xs">
            <Reply className="h-3 w-3 mr-1" />Reply
          </Button>
        )}
        {replyTo === comment.id && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Your name *" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
              <Input placeholder="Your email *" type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
            </div>
            <Textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="Write a reply..." className="min-h-[80px]" />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>Post Reply</Button>
              <Button variant="outline" size="sm" onClick={() => { setReplyTo(null); setReplyContent(''); }}>Cancel</Button>
            </div>
          </div>
        )}
      </CardContent>
      {comment.replies.length > 0 && (
        <div className="pl-6 pb-4">
          {comment.replies.map(reply => <CommentItem key={reply.id} comment={reply} isReply />)}
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-xl font-semibold">
          Comments ({comments.reduce((total, c) => total + 1 + c.replies.length, 0)})
        </h3>
      </div>

      <Card className="bg-gradient-to-r from-card/50 to-card">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Your name *" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
              <Input placeholder="Your email *" type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
            </div>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this post..."
              className="min-h-[120px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                <MessageCircle className="h-4 w-4 mr-2" />Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
};

export default BlogComments;
