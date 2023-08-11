import { useEffect, RefObject } from "react";

type ListRef = RefObject<HTMLDivElement>;
type ListEndRef = RefObject<Element>;
type Callback = () => void;

const useInfiniteScroll = (
  listRef: ListRef,
  listEndRef: ListEndRef,
  callback: Callback
) => {
  useEffect(() => {
    const options = {
      root: listRef.current,
      threshold: 0,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        callback();
      }
    }, options);

    if (listEndRef.current) {
      observer.observe(listEndRef.current);
    }

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);
};

export default useInfiniteScroll;
