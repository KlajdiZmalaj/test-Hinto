import { useState } from "react";
import styled from "styled-components";
import { Post } from "../../providers/PostsContext";
import { MAX_PAGE } from "../../routes/Home/Home";

type propTypes = {
  posts: Post[];
  start: number;
  setStart: (start: number) => void;
};
type rowTypes = {
  hasDetails: boolean;
};
export default ({ posts, start, setStart }: propTypes) => {
  return (
    <Table className="animate__animated animate__bounceInUp">
      <TableHeader>
        <span>ID</span>
        <span>User ID</span>
        <span>Title</span>
      </TableHeader>
      <TableBody
        onScroll={(e: any) => {
          const containerHeight = e.target?.getBoundingClientRect?.()?.height;
          const scollTop = e.target.scrollTop;
          const scollHeight = e.target.scrollHeight;
          if (containerHeight + scollTop >= scollHeight && start * 10 < MAX_PAGE) {
            //if its scolled To  bottom | has reached limit on db
            setStart(start + 1);
          }
          console.log("ca ka e", containerHeight, scollTop, e.target);
        }}
      >
        {posts.map((post) => {
          return <TableRowComp key={post.id} post={post} />;
        })}
      </TableBody>
    </Table>
  );
};

const TableRowComp = ({ post }: { post: Post }) => {
  const [hasDetails, setDetails] = useState(false);
  return (
    <>
      <TableRow
        hasDetails={hasDetails}
        onClick={() => {
          setDetails(!hasDetails);
        }}
      >
        <span>{post.id}</span>
        <span>{post.userId}</span>
        <span>{post.title}</span>
      </TableRow>
      {hasDetails && (
        <TableRowDetails className="animate__animated animate__bounceInRight">
          <h3>
            Row description{" "}
            <span>
              , ID:{post.id} User ID: {post.userId}
            </span>
          </h3>
          <div> {post.body}</div>
        </TableRowDetails>
      )}
    </>
  );
};

//STYLED COMPONETS
const Table = styled.div`
  width: 90%;
  display: flex;
  margin: auto;
  flex-flow: column;
  margin-top: 60px;
  border: 1px solid #2da54345;
`;
const spanStyles = `
span {
    width: 100%;
    text-align: center;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform:capitalize;
    :nth-child(1) ,  :nth-child(2) {
        width:80px;
        @media (max-width: 768px) {
            display:none;
        }
    };
    :nth-child(3) {
        text-align:right;
        justify-content: right;
        padding-right : 15px;
        @media (max-width: 768px) {
            justify-content: center;
            text-align:center;
            font-size:14px;
            min-height: 40px;
            height: auto;
        }
    }
    
  }`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #2da542;
  color: #fff;
  ${spanStyles}
  span:nth-child(3) {
    padding-right: 25px;
  }
`;
const TableBody = styled.div`
  display: flex;
  flex-flow: column;
  //To make 9 visible => 10th does the request
  height: calc(40px * 9);
  overflow: auto;
  overflow-x: hidden;
`;
const TableRow = styled.div<rowTypes>`
  display: flex;
  align-items: center;
  background-color: #fff;
  transition: all 0.3s;
  border-left: 4px solid transparent;
  border-left-color: ${({ hasDetails }) => (hasDetails ? "#2da5426e" : "transparent")};
  :hover {
    background-color: #fcfcfc;
  }
  :nth-child(odd) {
    background-color: #2da54214;
    :hover {
      background-color: #2da5431c;
    }
  }
  cursor: pointer;

  ${spanStyles}
`;
const TableRowDetails = styled.div`
  display: flex;
  padding: 20px;
  display: flex;
  flex-flow: column;
  font-size: 15px;
  border-left: 4px solid #2da5426e;
  text-transform: capitalize;
  box-shadow: inset 0 0 17px -12px #000;
  background-color: #fff;
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex;
    span {
      display: none;
      @media (max-width: 768px) {
        display: flex;
      }
    }
  }
`;
