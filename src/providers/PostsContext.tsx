import { createContext, useCallback, useContext, useState } from "react";

export type Post = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

type PostsContextType = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  loadingPosts?: boolean;
  setLoadingPosts?: (loadingPosts: boolean) => void;
};

// default context with no-op values
const PostsContext = createContext<PostsContextType>({
  posts: [],
  loadingPosts: false,
  setPosts: () => undefined,
  setLoadingPosts: () => undefined,
});

type Props = {
  children: JSX.Element | JSX.Element[] | string | string[] | React.ReactNode | React.ReactChild;
};
export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const handleOnPosts = useCallback(
    (updatedPosts: Post[]) => {
      setPosts(updatedPosts);
      setLoadingPosts(false);
    },
    [posts],
  );

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts: handleOnPosts,
        loadingPosts,
        setLoadingPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextType => useContext<PostsContextType>(PostsContext);
