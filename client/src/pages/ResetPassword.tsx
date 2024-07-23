import styled from "styled-components";
import Title from "../components/common/Title"
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "../hooks/useAlert";
import { useState } from "react";
import { resetPassword, resetRequest } from "../api/auth.api";

export interface ResetPasswordProps {
    email : string;
    password : string;
}

const ResetPassword = () => {
    const navigate = useNavigate();
    const showAlert = useAlert();
    const [resetRequested, setResetRequested] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordProps>();

    const onSubmit = (data : ResetPasswordProps) => {
        if(resetRequested){
            resetPassword(data).then((res)=>{
                showAlert('비밀번호가 초기화 되었습니다.');
                navigate("/login");
            });
        } else {
            resetRequest(data).then((res)=>{
                setResetRequested(res.permit);
            });
        }
    };

    return (
    <>
        <Title size='large'>비밀번호 초기화</Title>
        <ResetPasswordStyle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <InputText
                        placeholder="이메일"
                        inputType="email"
                        { ...register("email", {required: true})}   
                    />
                    { errors.email && <p className="error-text">이메일을 입력해주세요</p> }
                </fieldset>
                {
                    resetRequested && (
                        <fieldset>
                            <InputText
                                placeholder="비밀번호"
                                inputType="password"
                                { ...register("password", {required: true})}  
                            />
                            { errors.password && <p className="error-text">비밀번호를 입력해주세요</p> }
                        </fieldset>
                    )
                }
                <fieldset>
                    <Button type="submit" size="medium" scheme="primary">
                        {resetRequested? '비밀번호 초기화' : '초기화 요청'}
                    </Button>
                </fieldset>
                <div className="info">
                    <Link to = "/reset">비밀번호 초기화</Link>
                </div>
            </form>
        </ResetPasswordStyle>
    </>
    )
};

const ResetPasswordStyle = styled.div`
    max-width: ${({ theme }) => theme.layout.width.small};
    margin: 80px auto;

    fieldset {
        border : 0;
        padding : 0 0 8px 0;
        p.error-text {
            color : red;
            margin-top : 4px;
        }
    }

    input {
        width : 100%;
    }

    button {
        width : 100%;
    }

    .info {
        text-align : center;
        padding : 16px 0 0 0;
    }
`;

export default ResetPassword