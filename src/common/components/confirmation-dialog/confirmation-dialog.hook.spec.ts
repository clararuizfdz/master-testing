import { renderHook, act } from '@testing-library/react-hooks';
import { createEmptyLookup, Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog specs', () => {
  it('should return an object with default values when it calls it', () => {
    // Arrange
    const defaultLookup: Lookup = createEmptyLookup();
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.itemToDelete).toEqual(defaultLookup);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should update isOpen to false when it calls onClose', () => {
    // Arrange
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBeFalsy();
  });

  it('should update itemToDelete to empty value and mantains isOpen as false when it calls onAccept', () => {
    // Arrange
    const emptyLookup: Lookup = createEmptyLookup();
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.itemToDelete).toEqual(emptyLookup);
  });

  it('should update isOpen to true and itemToDelete to expected itemToDelete when it calls onOpenDialog', () => {
    // Arrange
    const expectedItemToDelete: Lookup = {
      id: '12345',
      name: 'Testing name',
    };
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(expectedItemToDelete);
    });

    // Assert
    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.itemToDelete).toEqual(expectedItemToDelete);
  });
});
