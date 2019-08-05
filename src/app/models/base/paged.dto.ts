export class PagedList<T>
{
    public Source: Array<T>;
    public PageIndex: number;
    public PageSize: number;
    public TotalRows: number;
    public TotalPages: number;

    public get HasPreviousPage(): boolean {
        return (this.PageIndex > 1 && this.TotalPages > 0);
    }

    public get HasNextPage(): boolean {
        return (this.PageIndex + 1 < this.TotalPages);
    }

    // constructor(source: Array<T>, pageIndex: number, pageSize: number, totalRows: number) {
    //     this.TotalRows = totalRows;
    //     this.TotalPages = totalRows / pageSize;
    //     if (totalRows % pageSize > 0)
    //         this.TotalPages++;
    //     this.PageSize = pageSize;
    //     this.PageIndex = pageIndex;
    //     this.Source = source;
    // }
}
