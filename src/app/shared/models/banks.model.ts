export class BanksReturnModel {
    content: BanksModel[] = [new BanksModel()];
    pageable: PageableModel = new PageableModel();
    sort: SortModel = new SortModel();
    empty: boolean = false;
    first: boolean = false;
    last: boolean = false;
    number: number = 0;
    numberOfElements: number = 0;
    size: number = 0;
    totalElements: number = 0;
    totalPages: number = 0;
  }