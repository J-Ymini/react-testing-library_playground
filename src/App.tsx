import React, { useState } from "react";
import { useDataMutation, useDataQuery } from "./util";
import { useForm } from "react-hook-form";

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
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
      <div className="mb-10">
        {isVisible && <div data-testid="visible-test-element">Visible</div>}
        <button
          data-testid="visible-button"
          className="bg-blue-500 rounded-md px-3 py-1.5 mt-6 text-white font-bold"
          onClick={() => {
            setIsVisible((prev) => !prev);
          }}
        >
          {isVisible ? "set invisible" : "set visible"}
        </button>
      </div>
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
              data-testid="title-input"
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
          {titleError && (
            <div data-testid="title-error-message">{titleError.message}</div>
          )}
        </div>
        <div>
          <label>
            body
            <input
              data-testid="body-input"
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
          {bodyError && (
            <div data-testid="body-error-message">{bodyError.message}</div>
          )}
        </div>
        <button
          data-testid="sending-button"
          type="submit"
          className="bg-blue-500 rounded-md px-3 py-1.5 mt-6 text-white font-bold"
        >
          submit
        </button>
      </form>
      {isSuccess && (
        <div data-testid="sending-success-message">전송에 성공하였습니다.</div>
      )}
      <div>
        {postsData?.map(({ id, title, body }) => (
          <div key={id} className="mb-4" data-testid="data-list-item">
            <div className="text-xl font-bold">{title}</div>
            <div>{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
