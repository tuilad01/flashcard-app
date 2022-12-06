import { useEffect, useState } from 'react'
import { Form, Pagination } from 'react-bootstrap'

export type Pagination = {
    pageNumber: number
    pageSize: number
    pageSizes: number[]
    total: number,
    pages: number[],
    totalPage?: number
}

const calcPages = (pagination: Pagination) => {
    const { pageNumber, pageSize, total } = pagination
    const totalPage = Math.ceil(total / pageSize)
    const displayPages = []
    const displayPageLength = 5

    for (let index = -2; index < 3; index++) {
        const page = pageNumber + index
        if (page > 0 && page < totalPage + 1) {
            displayPages.push(page)
        }
    }

    // page 1 - 2
    while (displayPages.length < displayPageLength && displayPages[displayPages.length - 1] < totalPage) {
        displayPages.push(displayPages[displayPages.length - 1] + 1)
    }

    // page n and n -1
    while (displayPages.length < displayPageLength && displayPages[0] > 1) {
        displayPages.unshift(displayPages[0] - 1)
    }

    pagination.pages = displayPages
    pagination.totalPage = totalPage
    return pagination
}

function TablePagination({ total, onChangePage, pageNumber = 1, pageSize = 10, pageSizes = [10, 20, 50] }: { total: number, onChangePage?: (pagination: Pagination) => void, pageNumber?: number, pageSize?: number, pageSizes?: number[] }) {
    const defaultPagination: Pagination = {
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageSizes: pageSizes,
        total: total,
        pages: []
    }
    const [pagination, setPagination] = useState<Pagination>(calcPages(defaultPagination))
    const [sizes, setSizes] = useState<number[]>(defaultPagination.pageSizes)

    useEffect(() => {
        setPagination(calcPages({ ...pagination, pageNumber: pageNumber, total: total, pageSize: pageSize }))
    }, [total, pageNumber, pageSize])

    useEffect(() => {
        if (pageSizes.length > 0) {
            setPagination(calcPages({ ...pagination, pageSize: pageSizes[0] }))
            setSizes(pageSizes)
        }
    }, [pageSizes])

    const onClickPage = (page: number) => {
        const totalPage = pagination.totalPage || 0
        if (page !== pagination.pageNumber && page > 0 && page < totalPage + 1) {
            if (onChangePage) {
                onChangePage({ ...pagination, pageNumber: page })
                //const newTotal = onChangePage({ ...pagination, pageNumber: page })
                // if (newTotal > 0) {
                //     setPagination(calcPages({ ...pagination, pageNumber: page, total: newTotal }))
                // }
            }
        }
    }

    const onChangePageSize = (event: any) => {
        const size = event.currentTarget.value

        if (size) {
            if (onChangePage) {
                onChangePage({ ...pagination, pageNumber: 1, pageSize: size })
                // const newTotal = onChangePage({ ...pagination, pageNumber: 1, pageSize: size })
                // if (newTotal > 0) {
                //     setPagination(calcPages({ ...pagination, pageNumber: 1, pageSize: size, total: newTotal }))
                // }
            }
        }
    }

    return (
        <>
            <div className='d-flex flex-row justify-content-between flex-wrap-reverse'>

                <Pagination>
                    {/* First page */}
                    <Pagination.First onClick={() => onClickPage(1)} disabled={pagination.pageNumber === 1} />

                    {/* 5 previous pages */}
                    <Pagination.Prev onClick={() => onClickPage(pagination.pageNumber - 5)} disabled={pagination.pageNumber - 5 <= 0} />


                    {pagination.pages.map((page: number, index: number) => {
                        return (

                            <Pagination.Item key={`paginationKey_${index}`} active={page === pagination.pageNumber} onClick={() => onClickPage(page)}>{page}</Pagination.Item>

                        )
                    })}

                    {/* 5 next pages */}
                    <Pagination.Next onClick={() => onClickPage(pagination.pageNumber + 5)} disabled={pagination.totalPage !== undefined && pagination.pageNumber + 5 > pagination.totalPage} />


                    {/* Last page */}
                    <Pagination.Last onClick={() => pagination.totalPage && onClickPage(pagination.totalPage)} disabled={pagination.pageNumber === pagination.totalPage} />

                </Pagination>
                <div>
                    <Form.Select value={pagination.pageSize} onChange={onChangePageSize}>
                        {sizes.map((size: number) => {
                            return (
                                <option key={`pageSizeKey_${size}`} value={size}>{size}</option>
                            )
                        })}
                    </Form.Select>
                </div>
            </div>
        </>
    );
}

export default TablePagination;
