import { Link } from "react-router-dom";
import "./post.css";

export const Post = ({ post }) => {
  const PF = "http://localhost:3000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, i) => (
            <span className="postCat" key={i}>
              {c}
            </span>
          ))}
        </div>
        <div className="postTitle">
          <Link to={"/post/" + post._id} className="link">
            {post.title}
          </Link>
        </div>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.description}</p>
    </div>
  );
};
