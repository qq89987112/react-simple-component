import BaseComponent from "./BaseComponent";
import TableUtils from "./ant/ant-custom/TableUtils";

class TableComponent extends BaseComponent {
    tableUtils = new TableUtils(this);
}

export default TableComponent;