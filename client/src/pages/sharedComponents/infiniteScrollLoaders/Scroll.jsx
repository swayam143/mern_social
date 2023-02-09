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

export const Loading = () => {
  return <MainHeading classNames=" text-center my-5" title="Loading..." />;
};

export const Scroll = ({ fetchMoredata, hasMore, data, children }) => {
  return (
    <InfiniteScroll
      dataLength={data?.length || 0}
      next={fetchMoredata}
      hasMore={hasMore}
      loader={<Loading />}
      // endMessage={<NoMoreData />}
    >
      {children}
    </InfiniteScroll>
  );
};
