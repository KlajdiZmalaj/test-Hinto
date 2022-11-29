import { useEffect, useState } from "react";
import Table from "../../components/TableComponent/Table";
import { usePosts } from "../../providers/PostsContext";
import { getPosts } from "../../services";

export const PER_PAGE = 10;
export const MAX_PAGE = 100;

export default () => {
  const { posts, setPosts, loadingPosts, setLoadingPosts } = usePosts();
  const [_start, setStart] = useState(0);
  const [type, setType] = useState("scroll");

  useEffect(() => {
    setLoadingPosts?.(true);
    //Get posts based on _start then set to context
    getPosts({ _start: _start * PER_PAGE, _limit: PER_PAGE }).then((data) => {
      //on scroll we keep old data on pagination we override, only we set prev [] if its start=0 (switch from pagination ex page:7)
      setPosts(type === "scroll" ? [...(_start === 0 ? [] : posts), ...data] : [...data]);
      setLoadingPosts?.(false);
    });
  }, [_start]);

  useEffect(() => {
    //when type changes table starts from begining
    setStart(0);
  }, [type]);

  return (
    <div className="home page">
      <Table type={type} setType={setType} start={_start} setStart={setStart} posts={posts} />
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
