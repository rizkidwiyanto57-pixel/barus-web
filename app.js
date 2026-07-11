const API_BASE =
"https://script.google.com/macros/s/AKfycbyTTv4-Wh--1U3szdDZKjl2IOTuMW52b-BDRVFQ7NJPXe5tc4NcAbSdXnTD7wGBHIeA/exec";

let brandChart;
let statusChart;
let departmentChart;
let agingChart;

/**
 * ==================================================
 * LOAD DASHBOARD
 * ==================================================
 */

async function loadDashboard(brand = "") {

  try {

    let url =
      API_BASE + "?action=dashboard";

    if (brand) {

      url +=
        "&brand=" +
        encodeURIComponent(brand);

    }

    const response =
      await fetch(url);

    const data =
      await response.json();

    if (!data.success) {

      alert("Gagal mengambil data");

      return;

    }

    updateKPI(data.kpi);

    createBrandChart(data.brand);

    createStatusChart(data.status);

    createDepartmentChart(data.department);

    createAgingChart(data.aging);

    createTop20Table(data.top20);

    document.getElementById(
      "lastUpdate"
    ).textContent =
      "Last Update : " +
      new Date(
        data.generatedAt
      ).toLocaleString("id-ID");

  }

  catch(error) {

    console.error(error);

    alert(
      "Gagal mengambil data BARUS API"
    );

  }

}

/**
 * ==================================================
 * LOAD FILTER
 * ==================================================
 */

async function loadFilters() {

  try {

    const response =
      await fetch(
        API_BASE +
        "?action=filters"
      );

    const data =
      await response.json();

    const dropdown =
      document.getElementById(
        "brandFilter"
      );

    dropdown.innerHTML =
      '<option value="">SEMUA BRAND</option>';

    data.brand.forEach(
      brand => {

        const option =
          document.createElement(
            "option"
          );

        option.value =
          brand;

        option.textContent =
          brand;

        dropdown.appendChild(
          option
        );

      }
    );

  }

  catch(error) {

    console.error(error);

  }

}

/**
 * ==================================================
 * FILTER BUTTON
 * ==================================================
 */

function applyFilter() {

  const brand =
    document.getElementById(
      "brandFilter"
    ).value;

  loadDashboard(brand);

}

/**
 * ==================================================
 * KPI
 * ==================================================
 */

function updateKPI(kpi) {

  document.getElementById(
    "openCase"
  ).textContent =

    (kpi.belumProgress || 0) +
    (kpi.doneEmail || 0);

  document.getElementById(
    "belumProgress"
  ).textContent =
    kpi.belumProgress || 0;

  document.getElementById(
    "doneEmail"
  ).textContent =
    kpi.doneEmail || 0;

  document.getElementById(
    "approveCase"
  ).textContent =
    kpi.approveCase || 0;

  document.getElementById(
    "clearCase"
  ).textContent =
    kpi.clearCase || 0;

}

/**
 * ==================================================
 * BRAND CHART
 * ==================================================
 */

function createBrandChart(data) {

  if (brandChart)
    brandChart.destroy();

  brandChart =
    new Chart(

      document.getElementById(
        "brandChart"
      ),

      {

        type: "bar",

        data: {

          labels:
            data.map(
              x => x.label
            ),

          datasets: [

            {

              label: "Case",

              data:
                data.map(
                  x => x.value
                )

            }

          ]

        }

      }

    );

}

/**
 * ==================================================
 * STATUS CHART
 * ==================================================
 */

function createStatusChart(data) {

  if (statusChart)
    statusChart.destroy();

  statusChart =
    new Chart(

      document.getElementById(
        "statusChart"
      ),

      {

        type: "pie",

        data: {

          labels:
            data.map(
              x => x.label
            ),

          datasets: [

            {

              data:
                data.map(
                  x => x.value
                )

            }

          ]

        }

      }

    );

}

/**
 * ==================================================
 * DEPARTMENT CHART
 * ==================================================
 */

function createDepartmentChart(data) {

  if (departmentChart)
    departmentChart.destroy();

  departmentChart =
    new Chart(

      document.getElementById(
        "departmentChart"
      ),

      {

        type: "bar",

        data: {

          labels:
            data.map(
              x => x.label
            ),

          datasets: [

            {

              label: "Case",

              data:
                data.map(
                  x => x.value
                )

            }

          ]

        },

        options: {

          indexAxis: "y"

        }

      }

    );

}

/**
 * ==================================================
 * AGING CHART
 * ==================================================
 */

function createAgingChart(data) {

  if (agingChart)
    agingChart.destroy();

  agingChart =
    new Chart(

      document.getElementById(
        "agingChart"
      ),

      {

        type: "bar",

        data: {

          labels:
            data.map(
              x => x.label
            ),

          datasets: [

            {

              label: "Case",

              data:
                data.map(
                  x => x.value
                )

            }

          ]

        }

      }

    );

}

/**
 * ==================================================
 * TOP 20 TABLE
 * ==================================================
 */

function createTop20Table(data) {

  const tbody =
    document.querySelector(
      "#oldestTable tbody"
    );

  tbody.innerHTML = "";

  data.forEach(row => {

    const tr =
      document.createElement("tr");

    row.forEach(cell => {

      const td =
        document.createElement("td");

      td.textContent =
        cell;

      tr.appendChild(td);

    });

    tbody.appendChild(tr);

  });

}

/**
 * ==================================================
 * START
 * ==================================================
 */

loadFilters();

loadDashboard();

/**
 * Refresh tiap 5 menit
 */

setInterval(() => {

  const brand =
    document.getElementById(
      "brandFilter"
    ).value;

  loadDashboard(brand);

}, 300000);