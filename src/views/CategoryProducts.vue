<template>
  <div class="container mx-auto px-4">
    <div class="bg-purple-600 p-4 text-white flex justify-between items-center">
      <div class="flex space-x-4 pc">
        <button class="bg-purple-800 px-3 py-1 rounded">CATEGORIES <i class="fas fa-chevron-down"></i></button>
        <button class="px-3 py-1">New arrivals</button>
        <button class="px-3 py-1">Promotions</button>
      </div>
      <div class="relative">
        <el-input v-model="listQuery.keywords" placeholder="Search for products" @change="handleQuery"></el-input>
      </div>
    </div>

    <nav class="py-4">
      <ul class="flex space-x-2 text-sm">
        <li>Home</li>
        <li>/</li>
        <li class="font-bold">Selected Category</li>
      </ul>
    </nav>

    <div class="flex">
      <div class="w-1/4 pc">
        <button class="bg-purple-700 text-white px-4 py-2 w-full mb-4">SHOP BY</button>
        <button class="bg-purple-700 text-white px-4 py-2 w-full">COMPARE PRODUCTS</button>
        <p class="text-sm py-2">You have no items to compare.</p>
      </div>
      <div class="w-3/4 pl-4">
        <h2 class="text-2xl font-bold mb-4">Selected Category</h2>
        <el-pagination
            class="text-left pc"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.pageNo"
            :page-sizes="[40, 80, 160]"
            :page-size="listQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"/>
        <el-pagination
            class="text-left mobile"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.pageNo"
            :page-sizes="[40, 80, 160]"
            :page-size="listQuery.pageSize"
            layout="total, prev, next"
            :total="total"/>
        <el-container v-loading="listLoading" class="list text-center" style="width: 100%">
          <div v-for="product in list" class="border p-4 text-center" :key="product.entity_id">
            <el-image :src="product.gallery[0]" class="mx-auto mb-2">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-picture"></i>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <h3 class="font-bold text-left over_two_lines">{{ product.title }}</h3>
            <a href="#" class="text-purple-600 text-sm">Login for More Details</a>
          </div>
        </el-container>

      </div>
    </div>
  </div>
</template>

<script>
import {getProducts} from '@/api/product'

export default {
  name: 'CategoryProducts',
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        keywords: 'Gardeon',
        pageNo: 1,
        pageSize: 40
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getProducts(this.listQuery.keywords, this.listQuery.pageNo, this.listQuery.pageSize)
          .then(response => {
            this.list = response.data.result
            this.total = response.data.total
            this.listLoading = false
          }).catch((e) => {
        console.log(e)
        this.listLoading = false
      })
    },
    handleQuery() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    handleCurrentChange(pageNo) {
      this.listQuery.pageNo = pageNo
      this.getList()
    },
    handleSizeChange(size) {
      this.listQuery.pageSize = size
      this.getList()
    }
  }
}
</script>
<style scoped>
.over_two_lines {
  display: -webkit-box;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre-line;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

@media only screen and (max-width: 768px) {
  .mobile {
    display: block;
  }

  .pc {
    display: none;
  }

  .list {
    display: block;
  }
}

@media only screen and (min-width: 769px) {
  .mobile {
    display: none;
  }

  .pc {
    display: block;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }
}

/deep/ .el-loading-spinner {
  left: 50% !important;
  margin-top: 10px !important;
}
</style>
