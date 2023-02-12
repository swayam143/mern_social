import InfiniteScroll from "react-infinite-scroll-component";
import { MainHeading } from "../../../components/text/Texts";

export const NoMoreData = () => {
  return (
    <MainHeading
      classNames=" text-center my-5"
      title="No More Post Available"
    />
  );
};

export const Loading = (data) => {
  return (
    <MainHeading
      classNames=" text-center my-5"
      title={` ${data?.data?.length >= 10 ? "Loading..." : ""}`}
    />
  );
};

export const Scroll = ({ fetchMoredata, hasMore, data, children }) => {
  return (
    <InfiniteScroll
      dataLength={data?.length || 0}
      next={fetchMoredata}
      hasMore={hasMore}
      loader={<Loading data={data} />}
      endMessage={<NoMoreData />}
    >
      {children}
    </InfiniteScroll>
  );
};
