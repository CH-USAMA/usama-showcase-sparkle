import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  status: 'draft' | 'published';
}

const PostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    status: 'draft'
  });

  const isEditing = Boolean(id && id !== 'new');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (isEditing) {
      fetchPost();
    }
  }, [user, id, isEditing, navigate]);

  const fetchPost = async () => {
    if (!id || id === 'new') return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setPost({
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content,
        featured_image: data.featured_image || '',
        status: data.status as 'draft' | 'published'
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: "Error",
        description: "Failed to load post",
        variant: "destructive",
      });
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setPost(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSave = async () => {
    if (!post.title.trim() || !post.content.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Get user profile for author_id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (profileError) throw profileError;

      const postData = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image || null,
        status: post.status,
        author_id: profile.id,
        published_at: post.status === 'published' ? new Date().toISOString() : null
      };

      let error;
      
      if (isEditing) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([postData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: `Post ${isEditing ? 'updated' : 'created'} successfully`,
      });
      
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">
                  {isEditing ? 'Edit Post' : 'New Post'}
                </h1>
              </div>
            </div>
            <Button onClick={handleSave} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save Post'}
            </Button>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={post.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={post.slug}
                    onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="post-url-slug"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={post.excerpt}
                  onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the post"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={post.featured_image}
                  onChange={(e) => setPost(prev => ({ ...prev, featured_image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <div className="mb-3 p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium text-sm mb-2">Formatting Guide:</p>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <div><code className="bg-background px-1 rounded">**bold text**</code> → <strong>bold text</strong></div>
                    <div><code className="bg-background px-1 rounded">*italic text*</code> → <em>italic text</em></div>
                    <div><code className="bg-background px-1 rounded">`inline code`</code> → <code className="bg-background px-1 rounded">inline code</code></div>
                    <div><code className="bg-background px-1 rounded">```javascript</code> → Code blocks with syntax highlighting</div>
                  </div>
                </div>
                <Textarea
                  id="content"
                  value={post.content}
                  onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your post content here...

Example with formatting:

## Introduction
This is a **bold** statement with *italic* text and `inline code`.

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

You can also use:
- Lists like this
- With multiple items

> Blockquotes for important notes
"
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={post.status} 
                  onValueChange={(value: 'draft' | 'published') => 
                    setPost(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PostEditor;