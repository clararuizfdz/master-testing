import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';

describe('spinner component spec', () => {
  it('should be rendered properly when open property is true', () => {
    //Arrange
    const usePromiseTrackerStub = jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockReturnValue({
        promiseInProgress: true,
      });

    //Act
    render(<SpinnerComponent />);
    // const loader = screen.getByTestId('loader');
    const modal = screen.getByTestId('modal');

    //Assert
    expect(usePromiseTrackerStub).toHaveBeenCalled();
    expect(modal).toBeInTheDocument();
  });

  it('should not be rendered properly when open property is false', () => {
    //Arrange
    const usePromiseTrackerStub = jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockReturnValue({
        promiseInProgress: false,
      });

    //Act
    render(<SpinnerComponent />);
    const modal = screen.queryByTestId('modal');

    //Assert
    expect(modal).not.toBeInTheDocument();
  });

  //   it('should be closed when open property is changed to false', () => {
  //     //Arrange
  //     const usePromiseTrackerStub = jest
  //       .spyOn(promiseTracker, 'usePromiseTracker')
  //       .mockReturnValue({
  //         promiseInProgress: true,
  //       });

  //     //Act
  //     render(<SpinnerComponent />);

  //     usePromiseTrackerStub.mockReturnValue({
  //       promiseInProgress: false,
  //     });

  //     const modal = screen.queryByTestId('modal');

  //     //Assert

  //     expect(modal).not.toBeInTheDocument();
  //   });
});
