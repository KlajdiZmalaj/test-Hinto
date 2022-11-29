import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Post } from "../../providers/PostsContext";
import { MAX_PAGE, PER_PAGE } from "../../routes/Home/Home";
import PaginationComp from "../../components/Pagination/index";
type propTypes = {
  posts: Post[];
  start: number;
  setStart: (start: number) => void;
  setType: (type: string) => void;
  type: string;
};
type rowTypes = {
  hasDetails: boolean;
};
type buttonTypes = {
  isActive: boolean;
};
type tableBodyTypes = {
  isPagination?: boolean;
};
export default ({ posts, start, setStart, type, setType }: propTypes) => {
  const renderPosts = useCallback(
    () =>
      posts.map((post) => {
        return <TableRowComp key={post.id} post={post} />;
      }),
    [posts],
  );
  return (
    <Table className="animate__animated animate__bounceInUp">
      <ButtonsContainer>
        <Button
          isActive={type === "scroll"}
          onClick={() => {
            setType("scroll");
          }}
        >
          Ininite scroll
        </Button>
        <Button
          isActive={type === "pagination"}
          onClick={() => {
            setType("pagination");
          }}
        >
          With pagination
        </Button>
      </ButtonsContainer>
      <TableHeader>
        <span>ID</span>
        <span>User ID</span>
        <span>Title</span>
      </TableHeader>
      {type === "scroll" && (
        <TableBody
          onScroll={(e: any) => {
            const containerHeight = e.target?.getBoundingClientRect?.()?.height;
            const scollTop = e.target.scrollTop;
            const scollHeight = e.target.scrollHeight;
            if (containerHeight + scollTop >= scollHeight && start * 10 < MAX_PAGE) {
              //if its scolled To  bottom | has reached limit on db
              setStart(start + 1);
            }
            // console.log("ca ka e", containerHeight, scollTop, e.target);
          }}
        >
          {renderPosts()}
        </TableBody>
      )}
      {type === "pagination" && (
        <TableBody isPagination>
          {renderPosts()}
          <PaginationComp
            className="pagination-bar"
            currentPage={start}
            totalCount={MAX_PAGE}
            pageSize={PER_PAGE}
            onPageChange={(page: any) => setStart(page)}
          />
        </TableBody>
      )}
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

const ButtonsContainer = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff1f;
`;
const Button = styled.button<buttonTypes>`
  display: flex;
  border: 1px solid #2da542;
  color: #2da542;
  background-color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  padding: 0 5px;
  cursor: pointer;
  position: relative;
  :after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    display: ${({ isActive }) => (isActive ? "block" : "none")};
    background-color: #2da542;
  }
`;
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
const TableBody = styled.div<tableBodyTypes>`
  display: flex;
  flex-flow: column;
  //To make 9 visible => 10th does the request
  height: ${({ isPagination }) => (isPagination ? "440px" : "calc(40px * 9)")};
  overflow: auto;
  overflow-x: hidden;
`;
const TableRow = styled.div<rowTypes>`
  display: flex;
  align-items: center;
  background-color: #ffffff17;
  transition: all 0.3s;
  border-left: 4px solid transparent;
  border-left-color: ${({ hasDetails }) => (hasDetails ? "#2da5426e" : "transparent")};
  :hover {
    background-color: #ffffff21;
  }
  :nth-child(odd) {
    background-color: #ffffff2f;
    :hover {
      background-color: #ffffff3d;
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
  background-color: #ffffff0d;
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
