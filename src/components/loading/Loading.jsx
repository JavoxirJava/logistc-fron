import './style.css';

const LoadingBtn = ({className}) => {
    return (
        <div className={`dots-btn`}>
            <div className={`${className ? 'bg-red-500' : 'bg-white'}`}></div>
            <div className={`${className ? 'bg-red-500' : 'bg-white'}`}></div>
            <div className={`${className ? 'bg-red-500' : 'bg-white'}`}></div>
        </div>
    )
}

export default LoadingBtn;