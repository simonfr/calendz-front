<template>
  <div>
    <!-- ======================================= -->
    <!-- == "Base header" ====================== -->
    <!-- ======================================= -->
    <base-header
      type="primary"
      class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Dashboard</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
        <!-- <div class="col-lg-6 col-5 text-right">
          <base-button
            size="sm"
            type="neutral">New</base-button>
          <base-button
            size="sm"
            type="neutral">Filters</base-button>
        </div> -->
      </div>

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <next-course/>
        </div>

        <div class="col-xl-3 col-md-6">
          <NextHomework/>
        </div>

        <div class="col-xl-3 col-md-6">
          <a
            class="nav-link p-0"
            target="_blank"
            href="https://www.beecome.io/dashboard">
            <stats-card
              title="ACCÈS DIRECT À"
              type="gradient-blue"
              sub-title="beecome.io"
              icon="fas fa-bold">

              <template slot="footer">
                <i class="fas fa-external-link-alt mr-2"/>
                <span class="text-nowrap">cliquez pour y accéder</span>
              </template>
            </stats-card>
          </a>

        </div>
        <div class="col-xl-3 col-md-6">
          <clock/>
        </div>
      </div>
    </base-header>

    <!-- ======================================= -->
    <!-- == Main =============================== -->
    <!-- ======================================= -->
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-4">
          <today-courses/>
        </div>
        <div class="col-lg-4">
          <latest-homeworks/>
        </div>
        <div class="col-lg-4">
          <latest-notifications/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Clock from './Widgets/Clock'
import NextCourse from './Widgets/NextCourse'
import NextHomework from './Widgets/NextHomework'
import TodayCourses from './Widgets/TodayCourses'
import LatestHomeworks from './Widgets/LatestHomeworks'
import LatestNotifications from './Widgets/LatestNotifications'

export default {
  components: {
    Clock,
    NextCourse,
    NextHomework,
    TodayCourses,
    LatestHomeworks,
    LatestNotifications
  },
  beforeCreate () {
    localStorage.removeItem('calendz.calendar.searchInput')
  }
}
</script>
