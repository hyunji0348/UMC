export default function Modal(props) {
    return (
        <div className="modal-wrapper">
            <div className="modal">
                <h2 className="modal-title">안녕하세요</h2>
                <p>모달 내용은 어쩌고 저쩌고..</p>
        
                <div className="close-wrapper">
                <button id="close" onClick={()=>
                     {console.log(`모달이 꺼짐`);
                     props.setModal(false)}}>닫기</button>
                </div>
            </div>
        </div>
    )
}