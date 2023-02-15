import InfiniteScroll from "react-infinite-scroll-component";
import { MainHeading } from "../../../components/text/Texts";
import { motion } from "framer-motion";

export const NoMoreData = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="60">
        <motion.path
          d="M7.5,12.5 L4.5,9.5 L3,11 L7.5,15.5 L17,6 L15.5,4.5 L7.5,12.5 Z"
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{ pathLength: 1, pathOffset: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <MainHeading
          classNames=" text-center my-5"
          title="No More Post Available"
        />
      </motion.div>
    </div>
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
