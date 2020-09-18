import { mapProjectFromApiToVm } from './project.mapper';
import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';

describe('mapProjectFromApiToVm', () => {
  it('should return an empty project when mapping undefined value', () => {
    //Arrange
    const project = undefined;

    //Act
    const result = mapProjectFromApiToVm(project);

    //Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return an empty project when mapping null value', () => {
    //Arrange
    const project = null;

    //Act
    const result = mapProjectFromApiToVm(project);

    //Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return expected project when mapping a project with an empty list of employees', () => {
    //Arrange
    const projectApi: apiModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [],
    };

    const expectedProjectModel: viewModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [],
    };

    //Act
    const result = mapProjectFromApiToVm(projectApi);

    //Assert
    expect(result).toEqual(expectedProjectModel);
  });

  it('should return expected result when mapping a project with an undefined employee list', () => {
    //Arrange
    const projectApi: apiModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: undefined,
    };

    const expectedProjectModel: viewModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [],
    };

    //Act
    const result = mapProjectFromApiToVm(projectApi);

    //Assert
    expect(result).toEqual(expectedProjectModel);
  });

  it('should return expected result when mapping a project with a null employee list', () => {
    //Arrange
    const projectApi: apiModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: null,
    };

    const expectedProjectModel: viewModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [],
    };

    //Act
    const result = mapProjectFromApiToVm(projectApi);

    //Assert
    expect(result).toEqual(expectedProjectModel);
  });

  it('should return expected result when mapping a project with an employee list with a null value', () => {
    //Arrange
    const employee = null;
    const projectApi: apiModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [employee],
    };

    const expectedProjectModel: viewModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [viewModel.createEmptyEmployeeSummary()],
    };

    //Act
    const result = mapProjectFromApiToVm(projectApi);

    //Assert
    expect(result).toEqual(expectedProjectModel);
  });

  it('should return expected result when mapping a project with an employee list with an undefined value', () => {
    //Arrange
    const employee = undefined;
    const projectApi: apiModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [employee],
    };

    const expectedProjectModel: viewModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [viewModel.createEmptyEmployeeSummary()],
    };

    //Act
    const result = mapProjectFromApiToVm(projectApi);

    //Assert
    expect(result).toEqual(expectedProjectModel);
  });

  it('should return expected result when mapping a project with a list with one employee', () => {
    //Arrange
    const projectApi: apiModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [
        {
          employeeName: 'Maria',
          id: '2222285',
          isAssigned: false,
        },
      ],
    };

    const expectedProjectModel: viewModel.Project = {
      id: '1',
      name: 'project name',
      isActive: true,
      employees: [
        {
          employeeName: 'Maria',
          id: '2222285',
          isAssigned: false,
        },
      ],
    };

    //Act
    const result = mapProjectFromApiToVm(projectApi);

    //Assert
    expect(result).toEqual(expectedProjectModel);
  });

  it('should return expected result when mapping a project with a list with two employees', () => {
    //Arrange
    const projectApi: apiModel.Project = {
      id: '100',
      name: 'project name',
      isActive: true,
      employees: [
        {
          employeeName: 'Maria',
          id: '2222285',
          isAssigned: false,
        },
        {
          employeeName: 'Antonio',
          id: '48952665',
          isAssigned: true,
        },
      ],
    };

    const expectedProjectModel: viewModel.Project = {
      id: '100',
      name: 'project name',
      isActive: true,
      employees: [
        {
          employeeName: 'Maria',
          id: '2222285',
          isAssigned: false,
        },
        {
          employeeName: 'Antonio',
          id: '48952665',
          isAssigned: true,
        },
      ],
    };

    //Act
    const result = mapProjectFromApiToVm(projectApi);

    //Assert
    expect(result).toEqual(expectedProjectModel);
  });
});
