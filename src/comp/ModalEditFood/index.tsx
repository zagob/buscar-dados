import { FormHandles } from '@unform/core';
import React, { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import Input from '../Input';
import Modal from '../Modal';

import { Form } from './styles';

interface IFoodPlate {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    formattedPrice: string;
}

interface IModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleUpdateFood: (food: Omit<IFoodPlate, 'id'>) => void;
    editingFood: IFoodPlate;
}

interface IEditFood {
    name: string;
    description: string;
    price: number;
    image_url: string;
    formattedPrice: string;
}

const ModalEditFood: React.FC<IModalProps> = ({ isOpen, setIsOpen, editingFood, handleUpdateFood }) => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: IEditFood) => {
        handleUpdateFood(data);

        setIsOpen();
    }, [handleUpdateFood, setIsOpen])

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
                <h1>Editar Prato</h1>
                <Input name="image_url" placeholder="Cole o link aqui" />
                <Input name="name" placeholder="Ex: Moda Italiana" />
                <Input name="price" placeholder="Ex: 19.90" />
                <Input name="description" placeholder="Descrição" />

                <button type="submit" data-testid="edit-food-button">
                    <div className="text">Editar Prato</div>
                    <div>
                        <FiCheckSquare size={24} />
                    </div>
                </button>
            </Form>
        </Modal>
  );
}

export default ModalEditFood;