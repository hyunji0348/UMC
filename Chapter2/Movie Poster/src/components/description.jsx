function Description(props) {
    return (
        <div className='description-container'>
            <span className='description-title' style={{ marginTop: '10px' }}>
                {props.title}</span>
            <div className='description-info'>
                <span>{props.overview}</span>
            </div>
        </div>
    )
}
  
export default Description