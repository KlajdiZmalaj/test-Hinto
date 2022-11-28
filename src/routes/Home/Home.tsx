import { useEffect, useState } from "react";
import Table from "../../components/TableComponent/Table";
import { usePosts } from "../../providers/PostsContext";
import { getPosts } from "../../services";

export const PER_PAGE = 10;
export const MAX_PAGE = 100;

export default () => {
  const { posts, setPosts, loadingPosts, setLoadingPosts } = usePosts();
  const [_start, setStart] = useState(0);
  useEffect(() => {
    setLoadingPosts?.(true);
    //Get posts based on _start then set to context
    getPosts({ _start: _start * PER_PAGE, _limit: PER_PAGE }).then((data) => {
      setPosts(data);
      setLoadingPosts?.(false);
    });
  }, [_start]);

  return (
    <div className="home page">
      <Table start={_start} setStart={setStart} posts={posts} />
      {loadingPosts && (
        <div className="loading">
          Loading Posts
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};
