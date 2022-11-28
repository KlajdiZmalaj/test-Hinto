import styled from "styled-components";
import { Post } from "../../providers/PostsContext";

type propTypes = {
  posts: Post[];
};

export default ({ posts }: propTypes) => {
  return (
    <Table>
      <TableHeader>
        <span>ID</span>
        <span>User ID</span>
        <span>Title</span>
      </TableHeader>
      <TableBody>
        {posts.map((post) => {
          return (
            <TableRow key={post.id}>
              <span>{post.id}</span>
              <span>{post.userId}</span>
              <span>{post.title}</span>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

//STYLED COMPONETS
const Table = styled.div`
  width: 90%;
  display: flex;
  margin: auto;
  flex-flow: column;
`;
const spanStyles = `
span {
    width: 100%;
    text-align: center;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #ccc;
  ${spanStyles}
`;
const TableBody = styled.div`
  display: flex;
  flex-flow: column;
  height: 500px;
  overflow: auto;
`;
const TableRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  :nth-child(odd) {
    background-color: #e4e4e4;
  }
  ${spanStyles}
`;
