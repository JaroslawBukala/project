const bcrypt = require('bcrypt');
const { _ } = require('core-js');
const jwt = require('jsonwebtoken')

//create a json web token
const createToken = (user, secret, expiresIn) => {
  const {email, password} = user;
  return jwt.sign({email, password}, secret, {expiresIn});
}


module.exports = {
    Query: {
      getCurrentUser: async(_, args, {User, currentUser}) =>{
            if(!currentUser){
              return null;
            }
            const user = User.findOne({email: currentUser.email}).populate({
              path: 'favorites',
              model: 'Post'
            })
            return user;
      },
      getUsers: async (_, args,{User}) => {
        const users = await User.find({}).populate({
               path: 'ID', 
               model: 'User'  
        });
        return users;
        },
      getPosts: async (_, args,{Post}) => {
            const posts = await Post.find({}).sort({ createdDate: 'desc'}).populate({
                   path: 'createdBy', 
                   model: 'User'  
            });
            return posts;
      },
      getPost: async (_, {postId}, {Post}) => {
        const post = await Post.findOne({_id: postId}).populate({
          // path: 'createdBy',
          // model: 'User',
          path: 'messages.messageUser',
          model: 'User'
        });
        return post;
      },
      infiniteScrollPosts: async (_, { pageNum, pageSize }, { Post })=>{
          let posts;
          if (pageNum === 1){
            posts = await Post.find({}).sort({createdDate: 'desc'}).populate({
              path: 'createdBy',
              model: 'User'
            }).limit(pageSize);
          }else{
            const skips = pageSize*(pageNum-1);
            posts = await Post.find({}).sort({createdDate: 'desc'}).populate({
              path: 'createdBy',
              model: 'User'
            }).skip(skips).limit(pageSize)
          }
          const totalDocs = await Post.countDocuments();
          const hasMore = totalDocs > pageSize*pageNum;
          return {posts, hasMore};

      },

      getBooks: async (_, args,{Book}) => {
        const books = await Book.find({}).populate({
               path: 'createdBy',
               model: 'Author'  
        });
        return books
        },
        getBook: async (_, {name}, {Book}) => {
          const book = await Book.findOne({name: name}).populate({
            path: 'createdBy',
            model: 'Author'  
          });
          return book
        },  
        getAuthors: async (_, args,{Author}) => {
            const authors = await Author.find({}).populate({
                   path: 'book', 
                   model: 'Book'  
            });
            return authors
            },

        

              
    },
    Mutation: {
     
       signinUser: async(_, {email, password}, {User})=>{
        const user = await User.findOne({ email });
        if(!user){
          throw new Error('User not found');
        }
        const isValidPassword =  await bcrypt.compare(password, user.password);
        if(!isValidPassword){
          throw new Error('Invalid password')
        }
        return { token: createToken(user, process.env.SECRET, '1hr')}
      },
      signupUser: async (_, {username, email, password }, { User }) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error("User already exists");
        }
        const newUser = await new User({
          
          username,
          email,
          password
        }).save();
        return { token: createToken(newUser, process.env.SECRET, '1hr')}
      },
      addBook: async (_,{ name, genre, creatorId},{ Book }) => {
        const newBook = await new Book({
          name,
          genre,
          createdBy: creatorId
        }).save();
        return newBook;
      }, 
      addPost: async (_,{ title, imageUrl, likes, categories, description, createdDate, messages, creatorId },{ Post }) => {
        const newPost = await new Post({
          title,
          imageUrl,
          categories,
          description,
          likes,
          createdDate,
          messages,
          createdBy: creatorId
        }).save();
        return newPost;
      },
      addPostMessage: async (_,  {messageBody, userId, postId}, {Post}) => {
          const newMessage = {
            messageBody,
            messageUser: userId
          };
          const post = await Post.findOneAndUpdate(
            // find post by id
            {_id: postId},
              //prepend new message to beginnig of message array
              { $push: {messages: { $each: [newMessage], $position: 0}}},
              //return fresh document after update
              {new: true}
            ).populate({
              path: 'messages.messageUser',
              model: 'User'
             });
            return post.messages[0];
      },
      addAuthor: async (_,{_id, name, age, bookId },{ Author }) => {
        const newAuthor = await new Author({
          _id,
          name,
          age,
          book: bookId
        }).save();
        return newAuthor;
      },
    }
  };
  