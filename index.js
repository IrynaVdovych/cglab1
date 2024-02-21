const cnv = document.querySelector('#cnv')
      const ctx = cnv.getContext('2d')

      const isCage = document.querySelector('#isCage')

      let points = []
      let matrix = []

      window.onload = drawGraphic

      document.querySelector('#clear').addEventListener('click', clear)
      document.querySelector('#mult').addEventListener('click', setMatrix)

      isCage.addEventListener('change', clear)

      function drawGraphic() {
          ctx.beginPath()
          ctx.strokeStyle = "#a80707"
          ctx.lineWidth = 1
          ctx.moveTo(0, cnv.height / 2)
          ctx.lineTo(cnv.width, cnv.height / 2)
          ctx.moveTo(cnv.width / 2, 0)
          ctx.lineTo(cnv.width / 2, cnv.height)
          ctx.lineWidth = 1
          for (let i = 0; i < cnv.width; i+= 10) {
              ctx.moveTo(i, cnv.height / 2)
              ctx.lineTo(i, (cnv.height / 2) + 5)
          }
          for (let i = 0; i < cnv.height; i+= 10) {
              ctx.moveTo(cnv.width / 2, i)
              ctx.lineTo((cnv.width / 2) + 5, i)
          }
          ctx.closePath()
          ctx.stroke()
          if (isCage.checked) drawCage()
      }

      function drawCage() {
          ctx.beginPath()
          ctx.lineWidth = 1
          ctx.globalAlpha = 0.8
          for (let i = 0; i < cnv.width; i+= 10) {
              ctx.moveTo(0, i)
              ctx.lineTo(cnv.width,  i)
          }
          for (let i = 0; i < cnv.width; i+= 10) {
              ctx.moveTo(i, 0)
              ctx.lineTo(i, cnv.height)
          }
          ctx.stroke()
      }

      function setPoints() {
          clear()
          const point = document.querySelectorAll('.point')
          points = []
          point.forEach(p => {
              if (p.children[0].value || p.children[0].value === 0)
                  points.push({x: p.children[0].value * 10, y: p.children[1].value * 10})
          })
          drawPoints(points,"#ff0000")
      }

      function drawPoints(points, color) {
          ctx.strokeStyle = color
          ctx.lineWidth = 2
          ctx.beginPath();
          for (let i = 0; i < points.length; i++) {
              ctx.arc((cnv.width / 2 + points[i].x), (cnv.height / 2 - points[i].y),2,0,Math.PI * 2, true)
          }
          ctx.closePath()
          ctx.stroke()
      }

      function setMatrix() {
          const mtx = document.querySelector('.matrix')
          matrix = []
          mtx.querySelectorAll('.field')
              .forEach(f => {
                  matrix.push(+f.children[0].value)
                  matrix.push(+f.children[1].value)
              })
          multiply()
      }

      function multiply() {
          const newPoints = []
          points.forEach(point => {
              if (matrix[4] && matrix[5]) {
                  newPoints.push({
                      x: point.x * matrix[0] + point.y * matrix[2] + matrix[4],
                      y: point.x * matrix[1] + point.y * matrix[3] + matrix[5]
                  })
              } else {
                  newPoints.push({
                      x: point.x * matrix[0] + point.y * matrix[2],
                      y: point.x * matrix[1] + point.y * matrix[3]
                  })
              }
          })
          drawPoints(newPoints,"#fff")
      }

      function clear() {
          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, cnv.width, cnv.height)
          drawGraphic()
      }