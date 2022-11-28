import { useEffect, useState } from "react";
import Table from "../../components/TableComponent/Table";
import { usePosts } from "../../providers/PostsContext";
import { getPosts } from "../../services";

export default () => {
  const { posts, setPosts } = usePosts();
  const [_start, setState] = useState(0);
  useEffect(() => {
    //Get posts based on start then set to context
    getPosts({ _start, _limit: 10 }).then((data) => {
      setPosts(data);
    });
  }, [_start]);
  console.log("posts", posts);

  return (
    <div className="home page">
      <Table posts={posts} />
    </div>
  );
};
