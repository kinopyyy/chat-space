class MessagesController < ApplicationController
  before_action :set_group
   #messageコントローラーで＠group使えるようにしている
  

  #Messageモデルの新しいインスタンスである@message
  #グループに所属する全てのメッセージである@messages
  #includes(:user)はN＋1問題の回避
  def index 
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end


  #グループ作成機能を実装した際と同様に、保存に成功した場合
  #保存に失敗した場合で処理を分岐
  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'    
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end 

  #＠group定義
  def set_group
    @group = Group.find(params[:group_id])
  end
end
