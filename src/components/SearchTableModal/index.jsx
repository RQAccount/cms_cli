import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import StandardTable from 'components/StandardTable';
import { getTableSelectedRows } from 'utils';

export default class SearchTableModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSelectedRowKeys: [],
            modalSelectedRows: [],
        };
    }

    static propTypes = {
        title: PropTypes.string, // modal标题
        searchComponent: PropTypes.element, // 搜索组件
        visible: PropTypes.bool, // modal开关
        onOk: PropTypes.func, // modal确定按钮
        onCancel: PropTypes.func, // modal取消按钮
        tableColumns: PropTypes.array, // 列表字段
        tableRowKey: PropTypes.string, // rowKey
        tableDataSource: PropTypes.array, // 列表数据
        handleGetTableList: PropTypes.func, // 获取列表
        loading: PropTypes.bool,
        pagination: PropTypes.object,
        isRadio: PropTypes.bool, // 是否是单选
    }

    onSelectRow = (selectedRowKeys, selectedRows) => {

        this.setState(({ modalSelectedRows }) => ({
            modalSelectedRowKeys: [...selectedRowKeys],
            modalSelectedRows: [...modalSelectedRows, ...selectedRows],
        }));
    }

    onOk = (e) => {
        e && e.preventDefault && e.preventDefault();

        const { onOk, tableRowKey } = this.props;
        const { modalSelectedRowKeys, modalSelectedRows } = this.state;
        const distinctSelectedRows = getTableSelectedRows(modalSelectedRowKeys, modalSelectedRows, tableRowKey);

        onOk(modalSelectedRowKeys, distinctSelectedRows);

        this.setState({
            modalSelectedRowKeys: [],
            modalSelectedRows: [],
        });
    }

    onCancel = (e) => {
        e && e.preventDefault && e.preventDefault();

        const { onCancel } = this.props;
        onCancel();

        this.setState({
            modalSelectedRowKeys: [],
            modalSelectedRows: [],
        });
    }

    render() {

        const {
            title,
            searchComponent,
            visible,
            tableColumns,
            tableDataSource,
            tableRowKey,
            loading,
            pagination,
            handleGetTableList,
            isRadio,
        } = this.props;

        const { modalSelectedRowKeys } = this.state;

        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
                width={'80%'}
                style={{ top: '150px' }}
                cancelText='取消'
                okText='确定'
            >

                {
                    searchComponent || null
                }

                <StandardTable
                    size="small"
                    isRadio={isRadio}
                    data={tableDataSource}
                    loading={loading}
                    pagination={pagination}
                    rowSelect={true}
                    selectedRowKeys={modalSelectedRowKeys}
                    columns={tableColumns}
                    rowKey={tableRowKey}
                    onChange={handleGetTableList}
                    onSelectRow={this.onSelectRow}
                />

            </Modal>
        );
    }
}
