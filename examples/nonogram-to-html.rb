# Converts the output from the nonogram Sentient program into a HTML document
# that displays the result in a grid.
#
# $ sentient --run nonogram.json | ruby nonogram-to-html.rb > grid.html

require "json"

result = JSON.parse(STDIN.read)
grid = result.fetch("grid")

grid.each do |row|
  print "<div class='nonogram-row'>"
  row.each do |cell|
    html_class = cell ? "shaded" : "blank"
    print "<div class='cell #{html_class}'></div>"
  end
  print "</div>"
end

puts <<-CSS
<style>
  .nonogram-row .cell {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid black;
  }

  .nonogram-row .shaded {
    background: black;
  }
</style>
CSS
