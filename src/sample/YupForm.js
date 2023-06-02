import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const YupForm = () => {
  const schema = yup.object().shape({
    id: yup.string().required("아이디를 입력해주세요."), // required 설정
    password: yup
      .number()
      .min(3, "3이상 값을 입력해주세요.")
      .typeError("값을 입력해주세요."), // 최솟값, 최댓값 설정
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const check = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div>
        <label>아이디</label>
        <input type="text" {...register("id")} />
        {errors.id && <h3>{errors.id.message}</h3>}
      </div>
      <div>
        <label>비밀번호</label>
        <input type="password" {...register("password")} />
        {errors.password && <h3>{errors.password.message}</h3>}
      </div>

      <div>
        <button onClick={handleSubmit(check)}>확인</button>
      </div>
    </div>
  );
};

export default YupForm;
