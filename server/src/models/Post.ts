import mongooze = require('mongoose');

export interface IPost {
  title: string;
  content: string;
  user: mongooze.Types.ObjectId;
}

const postSchema: mongooze.Schema = new mongooze.Schema(
  {
    title: { type: String },
    content: { type: String },
    user: { type: mongooze.Types.ObjectId, ref: 'User', required: true },
  },
  { collection: 'posts', timestamps: true }
);

export default mongooze.model<IPost>('Post', postSchema);
