-- Insert dummy Laravel relationships blog post
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  featured_image,
  status,
  author_id,
  published_at
) VALUES (
  'Complete Guide to Laravel Eloquent Relationships',
  'complete-guide-laravel-eloquent-relationships',
  'Master Laravel Eloquent relationships including One-to-One, One-to-Many, Many-to-Many, and advanced polymorphic relationships with practical examples.',
  '# Complete Guide to Laravel Eloquent Relationships

Laravel Eloquent provides a powerful and intuitive way to handle database relationships. In this comprehensive guide, we''ll explore all types of relationships with practical examples.

## One-to-One Relationships

A one-to-one relationship is a very basic relation. For example, a `User` model might be associated with one `Phone` model.

```php
// User.php
class User extends Model
{
    public function phone()
    {
        return $this->hasOne(Phone::class);
    }
}

// Phone.php  
class Phone extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

### Usage Example

```php
$user = User::find(1);
$phone = $user->phone;

// Or get user from phone
$phone = Phone::find(1);
$user = $phone->user;
```

## One-to-Many Relationships

A one-to-many relationship is used to define relationships where a single model owns any amount of other models. For example, a blog post may have an infinite number of comments.

```php
// Post.php
class Post extends Model
{
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}

// Comment.php
class Comment extends Model
{
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
```

### Creating Related Records

```php
$post = Post::find(1);

// Create a new comment
$comment = $post->comments()->create([
    ''content'' => ''Great article!'',
    ''author'' => ''John Doe''
]);

// Or save an existing comment
$comment = new Comment([
    ''content'' => ''Another comment'',
    ''author'' => ''Jane Smith''
]);
$post->comments()->save($comment);
```

## Many-to-Many Relationships

Many-to-many relationships are defined by the presence of an intermediate table. For example, a user may have many roles, and those roles are also shared by other users.

```php
// User.php
class User extends Model
{
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}

// Role.php
class Role extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
```

### Working with Pivot Data

```php
// Attach roles to user
$user = User::find(1);
$user->roles()->attach([1, 2, 3]);

// Detach roles
$user->roles()->detach([1, 2]);

// Sync roles (remove all existing and add new ones)
$user->roles()->sync([1, 3, 4]);

// Access pivot data
foreach ($user->roles as $role) {
    echo $role->pivot->created_at;
}
```

## Advanced: Polymorphic Relationships

Polymorphic relationships allow a model to belong to more than one other model on a single association.

```php
// Image.php
class Image extends Model
{
    public function imageable()
    {
        return $this->morphTo();
    }
}

// Post.php
class Post extends Model
{
    public function images()
    {
        return $this->morphMany(Image::class, ''imageable'');
    }
}

// User.php
class User extends Model
{
    public function images()
    {
        return $this->morphMany(Image::class, ''imageable'');
    }
}
```

### Using Polymorphic Relations

```php
// Get all images for a post
$post = Post::find(1);
$images = $post->images;

// Get the parent model from an image
$image = Image::find(1);
$imageable = $image->imageable; // Could be Post or User
```

## Eager Loading for Performance

Always use eager loading to avoid N+1 query problems:

```php
// Load posts with their comments and authors
$posts = Post::with([''comments'', ''author''])->get();

// Conditional eager loading
$posts = Post::with([''comments'' => function ($query) {
    $query->where(''approved'', true);
}])->get();

// Load nested relationships
$posts = Post::with(''comments.author'')->get();
```

## Best Practices

1. **Use descriptive relationship names**
2. **Always eager load when accessing multiple related models**
3. **Use exists() for checking relationship existence**
4. **Consider using database constraints for data integrity**

```php
// Check if post has comments without loading them
if ($post->comments()->exists()) {
    // Post has comments
}

// Count related models efficiently
$commentCount = $post->comments()->count();
```

## Conclusion

Laravel Eloquent relationships provide a clean and expressive way to work with related data. By understanding these patterns, you can build robust applications with clean, maintainable code.

Remember to always consider performance implications and use eager loading when appropriate to avoid common pitfalls like the N+1 query problem.',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
  'published',
  (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
  now()
);