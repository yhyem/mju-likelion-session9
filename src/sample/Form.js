import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            {...register("id", { required: "아이디를 입력해주세요." })}
          />
          {errors.id && <h3>{errors.id.message}</h3>}
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type="password"
            {...register("password", {
              min: { value: 3, message: "3이상 값을 입력해주세요." },
              required: "값을 입력해주세요.",
            })}
          />
          {errors.password && <h3>{errors.password.message}</h3>}
        </div>

        <div>
          <button type="submit">확인</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
