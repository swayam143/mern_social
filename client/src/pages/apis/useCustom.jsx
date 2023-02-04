export const useCustomFunctanilty = (setDrop, setEdit, setPostData) => {
  const handleEditPost = (data) => {
    setDrop("");
    setEdit(true);
    setPostData(data);
  };
  return { handleEditPost };
};
