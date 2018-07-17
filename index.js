const slider = createSlider(80)

const changeCx = (slider, value) => {
    slider.circle
        .transition()
        .duration(750)
        .attr("cx", slider.xScale(value))
}


// changeCx(slider, 50)

