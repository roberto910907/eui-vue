<template>
  <div
    class="euiFlexGroup euiFlexGroup--gutterLarge euiFlexGroup--alignItemsCenter euiFlexGroup--justifyContentSpaceBetween euiFlexGroup--directionRow euiFlexGroup--responsive">
    <div class="euiFlexItem euiFlexItem--flexGrowZero">
      <div class="euiPagination" role="group">
        <Pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          @next-click="next"
          @prev-click="previous"
          :pageChanged="pageChanged"
          :perPageChanged="perPageChanged"
          :page-sizes="[5,10,25,50,100]"
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total"
        >
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script>
    import { Pagination } from 'element-ui';

    export default {
        props: {
            total: {type: Number},
            pageChanged: {type: Function},
            perPageChanged: {type: Function}
        },
        components: {
            Pagination,
        },
        data() {
            return {
                current: 0,
                pages: 1
            }
        },
        created() {
            this.calPageCount();
        },
        methods: {
            setPage(page) {
                this.current = page;
                this.pageChanged({currentPage: this.current + 1});
            },
            previous() {
                if (this.current > 0)
                    this.setPage(this.current - 1)
            },
            next() {
                if (this.current < this.pages)
                    this.setPage(this.current + 1)
            },
            setPerPage(perPage) {
                this.perPage = perPage;
                this.calPageCount();
                this.perPageChanged({currentPerPage: this.perPage});
            },
            calPageCount() {
                if (this.total > this.perPage) {
                    this.pages = Math.round(this.total / this.perPage);
                    console.log(this.pages);
                } else {
                    this.pages = 1;
                    this.setPage(0);
                }
            },
            handleSizeChange(val) {
                this.setPerPage(val)
            },
            handleCurrentChange(val) {
                this.setPage(val - 1)
            }
        }
    }
</script>
