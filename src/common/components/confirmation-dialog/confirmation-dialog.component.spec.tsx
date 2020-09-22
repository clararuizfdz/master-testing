import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('Confirmation-Dialog component', () => {
  it('should be rendered properly when is opened', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Testing dialog',
      labels: {
        closeButton: 'close window',
        acceptButton: 'accept',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const titleDialog = screen.getByText(props.title);
    const buttonClose = screen.getByText(props.labels.closeButton);
    const buttonAccept = screen.getByText(props.labels.acceptButton);

    //Assert
    expect(titleDialog).toBeInTheDocument();
    expect(buttonClose).toBeInTheDocument();
    expect(buttonAccept).toBeInTheDocument();
  });

  it('should not be rendered properly when is opened', () => {
    //Arrange
    const props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Testing dialog',
      labels: {
        closeButton: 'close window',
        acceptButton: 'accept',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const titleDialog = screen.queryByTitle(props.title);

    //Assert
    expect(titleDialog).not.toBeInTheDocument();
  });

  it('should call onAccept function  when accept button is clicked', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Testing dialog',
      labels: {
        closeButton: 'close window',
        acceptButton: 'accept',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const buttonAccept = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });
    userEvent.click(buttonAccept);

    //Assert
    expect(props.onAccept).toHaveBeenCalled();
  });

  it('should call onClose function  when close button is clicked', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Testing dialog',
      labels: {
        closeButton: 'close window',
        acceptButton: 'accept',
      },
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const closeButton = screen.getByRole('button', {
      name: props.labels.closeButton,
    });
    userEvent.click(closeButton);

    //Assert
    expect(props.onClose).toHaveBeenCalled();
  });
});
