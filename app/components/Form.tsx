import React from "react";

const Form = () => {
  return (
    <div className="flex flex-col gap-6 w-[60%] mx-auto my-12 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col gap-8">
        <h3 className="uppercase tracking-widest text-xl text-center">
          Never Miss Out
        </h3>
        <p className="text-center">
          Don’t miss out on the latest arrivals, curated collections, and
          special editions.
        </p>
      </div>
      <form
        action=""
        className="border border-black px-4 py-2.5 flex justify-between "
      >
        <input type="text" placeholder="Enter email adress" />
        <button type="submit" className=" text-black">
          ➜
        </button>
      </form>
    </div>
  );
};

export default Form;
