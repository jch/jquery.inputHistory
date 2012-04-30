# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'coffeescript', :input => '.', :output => '.' do
  watch(%r{.+\.coffee$})
end

guard 'uglify', :input => 'jquery.inputHistory.js', :output => "jquery.inputHistory.min.js" do
  watch(%r{jquery.inputHistory.js})
end
