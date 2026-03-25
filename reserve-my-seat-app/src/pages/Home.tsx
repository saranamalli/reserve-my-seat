import { useToastStore } from "../store/toastStore";

const Home = () => {
  const { addToast } = useToastStore();
  const handleClick = () => {
    addToast("This is a test toast", "error");
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="bg-(--accent) hover:brightness-110 transition duration-200 text-white px-4 py-2 rounded-md font-medium"
      >
        Click here to add toast
      </button>
    </>
  );
};

export default Home;
