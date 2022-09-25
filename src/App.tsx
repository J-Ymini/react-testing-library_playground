import React from "react";
import { useDataMutation, useDataQuery } from "./util";
import { useForm } from "react-hook-form";

function App() {
  const { data: postsData } = useDataQuery();
  const { mutate, isSuccess, isLoading, error } = useDataMutation();
  const {
    register,
    watch,
    formState: {
      errors: { title: titleError, body: bodyError },
    },
    handleSubmit,
  } = useForm<{
    title: string;
    body: string;
  }>();

  return (
    <div className="App p-3">
      <form
        className="mb-5 flex flex-col max-w-sm"
        onSubmit={handleSubmit((data) => {
          mutate({ ...data, userId: 1 });
        })}
      >
        <div>
          <label>
            title
            <input
              {...register("title", {
                required: "입력이 필요합니다.",
                minLength: {
                  value: 3,
                  message: "3자 이상 입력이 필요합니다.",
                },
              })}
              className="border-2 border-indigo-500/100 border-solid mb-3 w-full"
            />
          </label>
          {titleError && <div>{titleError.message}</div>}
        </div>
        <div>
          <label>
            body
            <input
              {...register("body", {
                required: "입력이 필요합니다.",
                minLength: {
                  value: 3,
                  message: "3자 이상 입력이 필요합니다.",
                },
              })}
              className="border-2 border-indigo-500/100 border-solid w-full"
            />
          </label>
          {bodyError && <div>{bodyError.message}</div>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 rounded-md px-3 py-1.5 mt-6"
        >
          submit
        </button>
      </form>
      <div className="mb-4">
        {isSuccess && <div>전송에 성공하였습니다.</div>}
      </div>
      <div>
        {postsData?.map(({ id, title, body }) => (
          <div key={id} className="mb-4">
            <div className="text-xl font-bold">{title}</div>
            <div>{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
