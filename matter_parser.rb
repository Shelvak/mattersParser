class Matter
  require 'csv'

  class << self
    def new(matter)
      @matter = matter

      generate_js
      replace_generic_html_for_matter
    end

    def echo(str)
      %x{echo "#{str}" >> #{@matter}.js}
    end

    def grouped_matters
      matters = []

      CSV.read("#{@matter}.csv").each do |row|
        next if row[0] == 'Año'
        year, number, name, day, others = *row

        if year && name
          day ||= 'Sin día'
          year = year

          matters << { year: year, day: day, name: name }
        end
      end

      matters.sort_by { |m| m[:year] }.group_by { |m| m[:year] }
    end

    def write_the_beginner_node
      echo "var rootNode = { Content: '#{@matter.upcase}', Nodes: [] }"
    end

    def write_lvl_1_node(index, name)
      echo [
        "rootNode.Nodes[#{index}]",
        "{ Content: '#{name}', Nodes: [], Collapsed: true }"
      ].join(' = ')
    end

    def write_lvl_2_node(index1, index2, name)
      echo [
        "rootNode.Nodes[#{index1}].Nodes[#{index2}]",
        "{ Content: '#{name}', Nodes: [], Collapsed: true }"
      ].join(' = ')
    end

    def write_lvl_3_node(index1, index2, index3, name)
      echo [
        "rootNode.Nodes[#{index1}].Nodes[#{index2}].Nodes[#{index3}]",
        "{ Content: '#{name}' }"
      ].join(' = ')
    end


    def generate_js
      all_js_on_one_file
      write_the_beginner_node

      i = -1
      grouped_matters.each do |y, items|
        write_lvl_1_node(i+=1, y)

        days = items.map { |item| item[:day] }.uniq.sort
        days.each_with_index { |day, ii| write_lvl_2_node(i, ii, day[2..-1]) }

        current_day = nil
        iii = 0
        items.sort_by { |item| item[:day] }.each_with_index do |item|
          day = item[:day]
          ii = days.index(day)

          iii = if current_day == day
                  iii + 1
                else
                  current_day = day
                  0
                end

          write_lvl_3_node(i, ii, iii, item[:name])
        end
      end
    end

    def replace_generic_html_for_matter
      html = File.read('generator.html')

      html.gsub!('ChangeMeForMatter', @matter)
      File.open("#{@matter}.html", 'w') { |f| f.write(html) }
    end

    def all_js_on_one_file
      js  = File.read('JSTreeGraph.js')
      js << File.read('helpers.js')

      File.open("#{@matter}.js", 'w') { |f| f.write(js) }
    end
  end
end

ARGV.each do |matter|
  Matter.new(matter)
end
