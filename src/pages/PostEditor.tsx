import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const PostEditor = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Post Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Blog posts are now managed as static files. To add or edit posts, update the file at{' '}
                <code className="bg-muted px-2 py-1 rounded text-sm">src/data/blogs.ts</code>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PostEditor;
