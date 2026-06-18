interface ILoading {
  w?: number;
  h?: number;
}
const Loading = ({ w = 10, h = 10 }: ILoading) => {
  return (
    <div className="flex justify-center">
      <div
        className={`w-${w} h-${h} border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
