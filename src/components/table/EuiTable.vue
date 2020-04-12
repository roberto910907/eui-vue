<template>
  <div>
    <div class="euiFlexGroup euiFlexGroup--gutterMedium euiFlexGroup--directionRow euiFlexGroup--responsive">
      <div class="euiFlexItem">
        <div class="euiFormControlLayout euiFormControlLayout--fullWidth">
          <div class="euiFormControlLayout__childrenWrapper">
            <input class="euiFieldSearch euiFieldSearch--fullWidth" placeholder="Filter..." type="search"
                   v-model="searchTerm"/>
            <div class="euiFormControlLayoutIcons">
              <span class="euiFormControlLayoutCustomIcon">
                <EuiIcon icon-name="search"/>
              </span>
            </div>
          </div>
        </div>
      </div>
      <slot name="custom-header-actions"></slot>
      <div class="euiFlexItem euiFlexItem--flexGrowZero" v-if="refreshAction">
        <EuiButton
          :fill="false"
          @click="refreshButtonClicked"
          color="secondary"
          href="#"
          icon-name="refresh"
          title="Reload"/>
      </div>
      <div class="euiFlexItem euiFlexItem--flexGrowZero" v-if="createAction">
        <EuiButton
          :title="createButtonTitle"
          @click="createButtonClicked"
          href="#"
          icon-name="plus-in-circle"/>
      </div>
    </div>
    <div class="euiSpacer euiSpacer--m"></div>
    <VueGoodTable
      :columns="columns"
      :line-numbers="lineNumbers"
      :pagination-options="{enabled: true}"
      :rows="rows"
      :search-options="{enabled: true,externalQuery: searchTerm}"
      :sort-options="sortOptions"
      :style-class="getClassStyle()"
      row-style-class="euiTableRow euiTableRow-isSelectable euiTableRow-hasActions"
    >
      <template slot="table-row" slot-scope="props">
        <div class="euiTableCellContent">
            <span v-if="props.column.field === 'actions'">
                <slot name="actions-column" v-bind="props">
                    <a class="euiButtonIcon euiButtonIcon--primary euiButtonEdit"
                       @click="editButtonClicked(props.row.node.id)">
                        <EuiIcon icon-name="edit"/>
                    </a>
                    <a class="euiButtonIcon euiButtonIcon--danger euiButtonDelete"
                       @click="deleteButtonClicked(props.row.node.id)">
                        <EuiIcon icon-name="recycle"/>
                    </a>
                </slot>
            </span>
          <span class="euiTableCellContent__text" v-else>
              <slot name="table-row" v-bind="props">
                  {{props.formattedRow[props.column.field]}}
              </slot>
          </span>
        </div>
      </template>

      <template slot="table-column" slot-scope="props">
        <div class="euiTableCellContent">
          <span class="euiTableCellContent__text">{{props.column.label}}</span>
        </div>
      </template>

      <template slot="pagination-bottom" slot-scope="props">
        <EuiPagination
          :pageChanged="props.pageChanged"
          :perPageChanged="props.perPageChanged"
          :total="props.total">
          >
        </EuiPagination>
      </template>
    </VueGoodTable>
  </div>
</template>

<script>
    import { VueGoodTable } from 'vue-good-table';
    import EuiPagination from './EuiPagination';
    import EuiButton from './../button/EuiButton';
    import EuiIcon from './../icon/EuiIcon';

    export default {
        name: 'EuiTable',
        components: {
            EuiIcon,
            EuiButton,
            EuiPagination,
            VueGoodTable,
        },
        data() {
            return {
                searchTerm: '',
            }
        },
        props: {
            isLoading: {
                type: Boolean,
                default: false,
                required: false,
            },
            refreshAction: {
                type: Boolean,
                default: true,
                required: false,
            },
            createAction: {
                type: Boolean,
                default: true,
                required: false,
            },
            createButtonTitle: {
                type: String,
                default: '',
                required: false,
            },
            lineNumbers: {
                type: Boolean,
                default: false,
                required: false,
            },
            columns: {
                type: Array,
                required: true,
            },
            sortOptions: {
                type: Object,
                required: false,
                default: () => {
                    return {};
                },
            },
            rows: {
                type: Array,
                required: true,
            },
        },
        methods: {
            createButtonClicked() {
                this.$emit('create-row');
            },
            refreshButtonClicked() {
                this.$emit('refresh-table');
            },
            editButtonClicked(clickedRowId) {
                this.$emit('edit-row', clickedRowId);
            },
            deleteButtonClicked(clickedRowId) {
                this.$emit('delete-row', clickedRowId);
            },
            getClassStyle() {
                return 'euiTable euiTable--responsive ' + (this.isLoading ? 'euiBasicTable-loading' : '');
            },
        }
    }
</script>

<style>
  .euiTable th {
    position: relative;
  }

  .euiTable th.sortable:before {
    margin-bottom: -7px;
    border-top: 5px solid #cfd3e0;
  }

  .euiTable thead th.sorting-asc:after {
    border-bottom: 5px solid #409eff;
  }

  .euiTable thead th.sorting-desc:before {
    border-top: 5px solid #409eff;
  }

  .euiTable th.sortable:after {
    margin-top: -7px;
    border-bottom: 5px solid #cfd3e0;
  }

  .euiTable th.sortable:after, .euiTable th.sortable:before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    right: 7px;
    top: 50%;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
</style>
