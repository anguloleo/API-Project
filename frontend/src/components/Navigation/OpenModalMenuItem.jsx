
import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, 
  itemText, 
  onItemClick, 
  onModalClose 
}) 

{
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <li>
      <button className='dropdown-modal-button' onClick={onClick}>{itemText}</button></li>
  );
}

export default OpenModalMenuItem;