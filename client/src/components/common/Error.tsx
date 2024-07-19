import { useRouteError } from "react-router-dom";

interface RouteError {
    statusText? : string;
    message? : string;
}


const Error = () => {
    const error = useRouteError() as RouteError;

    return (
        <div>
            <div>오류 발생</div>
            <p>다음과 같은 오류가 발생했습니다.</p>
            <p>{error.statusText || error.message}</p>
        </div>
    );
}

export default Error;