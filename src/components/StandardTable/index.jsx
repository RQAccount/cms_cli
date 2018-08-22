import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Alert } from 'antd';
import styles from './index.less';

export default class StandardTable extends React.Component {
    static propTypes = {
        selectedRowKeys: PropTypes.array,
        onSelectRow: PropTypes.func,
        columns: PropTypes.array,
        data: PropTypes.array,
        pagination: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool,
        ]),
        loading: PropTypes.bool,
        rowSelect: PropTypes.bool,
        onChange: PropTypes.func,
        scroll: PropTypes.object,
        rowKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        const { onSelectRow } = this.props;
        onSelectRow && onSelectRow(selectedRowKeys, selectedRows);
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        const params = {
            page: pagination.current,
            page_size: pagination.pageSize,
        };
        onChange && onChange(params, filters, sorter);
    }

    cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    }

    render() {
        console.log('standard table');
        const { selectedRowKeys } = this.props;
        const {
            data,
            pagination,
            loading,
            columns,
            rowKey,
            rowSelect,
            scroll,
        } = this.props;

        const paginationProps = pagination ? {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        } : false;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        };

        return (
            <div className={styles.standardTable}>
                {
                    rowSelect ?
                        <div className={styles.tableAlert}>
                            <Alert
                                message={(
                                    <Fragment>
                                        已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                                        <a role="button" onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
                                    </Fragment>
                                )}
                                type="info"
                                showIcon
                            />
                        </div>
                        :
                        null
                }
                <Table
                    bordered
                    loading={loading}
                    rowKey={rowKey}
                    rowSelection={rowSelect ? rowSelection : null}
                    dataSource={data}
                    columns={columns}
                    pagination={paginationProps}
                    scroll={scroll}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}
